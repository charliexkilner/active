// Simple in-memory storage for demo purposes
class MemoryStore {
  private phoneNumbers: Set<string> = new Set()

  async add(phone: string): Promise<void> {
    this.phoneNumbers.add(phone)
  }

  async getCount(): Promise<number> {
    return this.phoneNumbers.size
  }
}

// Create a singleton instance
export const memoryStore = new MemoryStore()
