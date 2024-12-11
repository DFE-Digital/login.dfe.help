function isValidReferrer(referrer) {
  try {
    return ["http:", "https:"].includes(new URL(referrer).protocol);
  } catch {
    return referrer?.startsWith("/") ?? false;
  }
}

module.exports = isValidReferrer;
