import { ChainId } from '@uniswap/sdk-core'
import { BaseVariant, FeatureFlag, useBaseFlag } from '../index'

export function useOutageBannerOptimism(): BaseVariant {
  return useBaseFlag(FeatureFlag.outageBannerOptimism)
}

function useShowOutageBannerOptimism(): boolean {
  return useOutageBannerOptimism() === BaseVariant.Enabled
}

export function useOutageBannerArbitrum(): BaseVariant {
  return useBaseFlag(FeatureFlag.outageBannerArbitrum)
}

function useShowOutageBannerArbitrum(): boolean {
  return useOutageBannerArbitrum() === BaseVariant.Enabled
}

export function useOutageBannerPolygon(): BaseVariant {
  return useBaseFlag(FeatureFlag.outageBannerPolygon)
}

function useShowOutageBannerPolygon(): boolean {
  return useOutageBannerPolygon() === BaseVariant.Enabled
}

export function useOutageBanners(): Record<ChainId, boolean> {
  return {
    [ChainId.OPTIMISM]: useShowOutageBannerOptimism(),
    [ChainId.ARBITRUM_ONE]: useShowOutageBannerArbitrum(),
    [ChainId.POLYGON]: useShowOutageBannerPolygon(),

    [ChainId.MAINNET]: false,
    [ChainId.PULSECHAIN]: false,
    [ChainId.PULSECHAIN_TESTNET]: false,
    [ChainId.GOERLI]: true,
    [ChainId.SEPOLIA]: true,
    [ChainId.OPTIMISM_GOERLI]: true,
    [ChainId.OPTIMISM_SEPOLIA]: true,
    [ChainId.ARBITRUM_GOERLI]: true,
    [ChainId.ARBITRUM_SEPOLIA]: true,
    [ChainId.POLYGON_MUMBAI]: true,
    [ChainId.CELO]: true,
    [ChainId.CELO_ALFAJORES]: true,
    [ChainId.GNOSIS]: true,
    [ChainId.MOONBEAM]: true,
    [ChainId.BNB]: true,
    [ChainId.AVALANCHE]: true,
    [ChainId.BASE_GOERLI]: true,
    [ChainId.BASE]: true,
    [ChainId.ROOTSTOCK]: true,
    [ChainId.ZORA]: true,
    [ChainId.ZORA_SEPOLIA]: true,
  }
}
