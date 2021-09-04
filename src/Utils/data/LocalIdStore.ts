import localforage from "localforage";

export class LocalIdStore {
  private system_key = {
    ID_MAP: `${this.name}_id_map`,
    UNICOUNT: `${this.name}_unicount`,
  }
  
  constructor(public name: string) {}

  async getId(key: string) {
    const IDMap = await this.getIDMap();
    const existing = IDMap[key];
    if (existing !== undefined) return existing
    const id = await this.register(key);
    return id;
  }
  
  async register(key: string) {
    const id = Date.now() + await this.getUnicount();
    const prevIDMap = await this.getIDMap();
    await this.incrementUnicount();
    await localforage.setItem(this.system_key.ID_MAP, {
      ...prevIDMap,
      [key]: id,
    });
  
    return id;
  }
  
  private async getIDMap() {
    try {
      const data = await localforage.getItem<Record<string, number>>(this.system_key.ID_MAP) || {};
      return data
    } catch(e) {
      return {};
    }
  }
  
  private async incrementUnicount() {
    const prev = await this.getUnicount();
    return localforage.setItem(this.system_key.UNICOUNT, prev + 1);
  }
  
  private async getUnicount() {
    const data = await localforage.getItem<number>(this.system_key.UNICOUNT) || 0;
    return data;
  }
}
