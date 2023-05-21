export enum Role {
	ADMIN,
	MODERATOR,
  USER
}

export interface SignUp {
  username: String,
  email: String
  password: String,
  roles: string[]
}

export interface User {
  id: number,
  username: string,
  email: string,
  roles?: Array<Role>
}

export interface Profile extends User {
  fio: String,
  department: String,
  workYears: Number,
  supervisorDefensesDissertations: Number,
  academicDegree: String,
  post: string
}


