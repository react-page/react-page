import { Entity } from "draft-js";

// entityTypeFilter :: String -> CharacterMetaData -> Bool
const entityTypeFilter = (type) => (value) => {
  const entityKey = value.getEntity()

  if (!entityKey) {
    return false
  }

  return Entity.get(entityKey).getType() === type
}

// createEntityTypeStrategy :: String -> (ContentBlock -> (a -> b)) -> void
export const createEntityTypeStrategy = (type) => (contentBlock, cb) => {
  contentBlock.findEntityRanges(entityTypeFilter(type), cb)
}
