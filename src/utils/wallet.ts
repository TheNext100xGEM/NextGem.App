export function truncateWalletAddress(
  walletAddress: string,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!walletAddress || typeof walletAddress !== "string") {
    return "Invalid address"
  }

  if (walletAddress.length < startLength + endLength) {
    return walletAddress
  }

  // Tronque l'adresse
  const truncatedAddress =
    walletAddress.slice(0, startLength) +
    "..." +
    walletAddress.slice(-endLength)

  return truncatedAddress
}
