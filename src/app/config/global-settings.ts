import { StorageStrategy } from "../data/models/storage-strategy/storage-strategy";
import { LocalStorageStrategy } from "../data/models/storage-strategy/local-storage-strategy";

// The character limit for Kwartet game titles
export const GAME_TITLE_CHARACTER_LIMIT: number = 20;

// Where data is stored and retrieved
export const STORAGE_STRATEGY: StorageStrategy = new LocalStorageStrategy;
