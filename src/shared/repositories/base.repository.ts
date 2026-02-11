import {
  Repository,
  EntityTarget,
  EntityManager,
  ObjectLiteral,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(target: EntityTarget<T>, manager: EntityManager) {
    super(target, manager);
  }

  async findById(id: any): Promise<T | null> {
    return await this.findOne({ where: { id } as any });
  }
}
