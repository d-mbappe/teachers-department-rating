const db = require("../models");
const { v4: uuidv4 } = require('uuid');
const User = db.user;
const WorkingActivity = db.working_activity;
const DissertationsPhDmanager = db.dissertations_PhD_manager;
const AcademicCertification = db.academic_certification;
const DissertationsReviews = db.dissertation_reviews;
const DissertationCouncilMember = db.dissertation_council_member;
const DissertationCouncilMemberType = db.dissertation_council_member_type;
const DissertationsDefence = db.dissertations_defence;
const Articles = db.articles;
const ScientificGuidance = db.scientific_guidance;


const addDissertationsPhDmanagers = (userId, data) => {
  const dissertationsPhDmanagers = data.map(d => { return {id: uuidv4(), userId, workingActivityId: 1, ...d} });
  
  dissertationsPhDmanagers.forEach( async d => {
    await DissertationsPhDmanager.create(d);
  });
}

const addAcademicCertification = (userId, data, type) => {
  const workingActivityId = type === 'professor' ? 2 : 3;
  data = { ...data,  workingActivityId}

  AcademicCertification.create({userId, data})
}

const addDissertationsReviews = (userId, data) => {
  const dissertationsReviews = data.map(d => { return {id: uuidv4(), userId, workingActivityId: 4, ...d} });
  
  dissertationsReviews.forEach( async d => {
    await DissertationsReviews.create(d);
  });
}
//TODO: добавить еще логику для типа участия
const addDissertationCouncilMember = (userId, data) => {
  DissertationCouncilMember.create({id: uuidv4(), userId, data})
}

const addDissertationsDefence = (userId, data, type) => {
  const workingActivityId = type === 'candidate' ? 9 : 10;
  data = { ...data,  workingActivityId}

  DissertationsDefence.create({id: uuidv4(), userId, data})
}

const addArticles = (userId, data) => {
  const articles = data.map(d => { return {id: uuidv4(), userId, workingActivityId: 11, ...d} });
  
  articles.forEach( async d => {
    await Articles.create(d);
  });
}

const addScientificGuidance = (userId, data, type) => {
  let workingActivityId;
  
  switch (type) {
    case 'nirs':
      workingActivityId = 15;
      break;
    case 'vkr':
    workingActivityId = 16;
    break;
  
  }
  data = { ...data,  workingActivityId}

  ScientificGuidance.create({id: uuidv4(), userId, data})
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.addScienceActivities = async (req, res) =>  {
  try {
    const { 
      userId, 
      dissertationsPhDmanagers, 
      certificationDocent,
      certificationProfessor,
      dissertationReviews,
      dissertationCouncilMember,
      defenceCandidate,
      defenceDoctor,
      articles,
      nirs,
      vkr
     } = req.body;
    const user = await User.findByPk(userId);

    addDissertationsPhDmanagers(userId, dissertationsPhDmanagers);
    addAcademicCertification(userId, certificationDocent, 'docent');
    addAcademicCertification(userId, certificationProfessor, 'professor');
    addDissertationsReviews(userId, dissertationReviews);
    addDissertationCouncilMember(userId, dissertationCouncilMember);
    addDissertationsDefence(userId, defenceCandidate, 'candidate');
    addDissertationsDefence(userId, defenceDoctor, 'doctor');
    addArticles(userId, articles);
    addScientificGuidance(userId, nirs, 'nirs');
    addScientificGuidance(userId, vkr, 'vkr');
  
    res.send({data})
  }  catch (err) {
    return res.status(400).send({ message: err });
  }
};

/**
 ** Получения данных справочника типа работы в Диссертационном совете
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getMemberTypes = async (req, res) =>  {
  try {
    const data = await DissertationCouncilMemberType.findAll();

    res.send({data})
  }  catch (err) {
    return res.status(400).send({ message: err });
  }
};
