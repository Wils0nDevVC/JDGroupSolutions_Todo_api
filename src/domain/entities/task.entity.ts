export class TaskEntity {
  constructor(
    public id: string,
    public titulo: string,
    public descripcion: string,
    public estado: string,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
