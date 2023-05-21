// TODO: Не обязательно, с бэка приходит только название, можно убрать
export interface Role {
  id: number,
  name: string,
  title: string,
  createdAt: Date
  updatedAt: Date
}

export type Roles = Array<Role>;