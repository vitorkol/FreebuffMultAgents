import packageJson from "../../package.json"

const peerDependencies = packageJson.peerDependencies ?? {}

export const BIOME_PACKAGE_NAME = packageJson.name
export const BIOME_VERSION = packageJson.version
export const BIOME_VERSION_TAG = `v${BIOME_VERSION}`
export const BIOME_PACKAGE_WITH_VERSION = `${BIOME_PACKAGE_NAME}@${BIOME_VERSION}`
export const BIOME_REACT_PEER_RANGE = peerDependencies.react ?? "^18.0.0 || ^19.0.0"

