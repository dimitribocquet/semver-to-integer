// let wait = function (milliseconds) {
//   return new Promise((resolve) => {
//     if (typeof milliseconds !== 'number') {
//       throw new Error('milliseconds not a number');
//     }
//     setTimeout(() => resolve("done!"), milliseconds)
//   });
// };

const converter = function (semver, zero_pad = 3) {
  if(!semver) {
    throw new Error('semver is required');
  }
  if(!zero_pad) {
    throw new Error('zero_pad is required');
  }
  if(!onlyNumbers(zero_pad)) {
    throw new Error('zero_pad must be a number');
  }

  // Split SemVer into object
  const finalVersionsElements = {
    major: null,
    minor: null,
    patch: null,
    preReleaseName: null,
    preReleaseBuild: null,
  }

  const isPreRelease = semver.includes('-');
  const preVersionExploded = semver.split('-');
  const stableVersionExploded = preVersionExploded[0].split('.');

  console.debug(preVersionExploded);
  console.debug(preVersionExploded.length);


  finalVersionsElements.major = parseInt(stableVersionExploded[0]);
  finalVersionsElements.minor = parseInt(stableVersionExploded[1]);
  finalVersionsElements.patch = parseInt(stableVersionExploded[2]);

  if(isPreRelease === true) {
    const preReleaseVersionExploded = preVersionExploded[1].split('.');

    if(preReleaseVersionExploded.length > 1) {
      finalVersionsElements.preReleaseName = preReleaseVersionExploded[0];
      finalVersionsElements.preReleaseBuild = preReleaseVersionExploded[1]
      // finalVersionsElements.preReleaseBuild = onlyNumbers(preReleaseVersionExploded[1]) ? parseInt(preReleaseVersionExploded[1]) : preReleaseVersionExploded[1];
    } else {
      if(onlyNumbers(preReleaseVersionExploded[0])) {
        finalVersionsElements.preReleaseBuild = parseInt(preReleaseVersionExploded[0]);
      } else {
        finalVersionsElements.preReleaseName = preReleaseVersionExploded[0];
      }
    }
  }

  console.debug('finalVersionsElements');
  console.debug(finalVersionsElements);

  // Now we convert every element to integer with zero padding
  const finalVersions = {
    major: String(finalVersionsElements.major).padStart(zero_pad, '0'),
    minor: String(finalVersionsElements.minor).padStart(zero_pad, '0'),
    patch: String(finalVersionsElements.patch).padStart(zero_pad, '0'),
  }

  if(isPreRelease === true) {
    finalVersions.preReleaseName = convertPreReleaseNameToPaddedNumber(finalVersionsElements.preReleaseName, zero_pad)
    finalVersions.preReleaseBuild = convertPreReleaseNameToPaddedNumber(finalVersionsElements.preReleaseBuild, zero_pad)
  } else {
    finalVersions.preReleaseName = parseInt(Array(zero_pad).fill(9).join(''));
    finalVersions.preReleaseBuild = parseInt(Array(zero_pad).fill(9).join(''));
  }

  console.debug('finalVersions');
  console.debug(finalVersions);

  // Finally we join all elements to create the final version number
  const finalVersion = parseInt(Object.values(finalVersions).join(''));

  console.debug('finalVersion');
  console.debug(finalVersion);

  return finalVersion;
}

function onlyNumbers(str) {
  return /^[0-9]+$/.test(str);
}

function convertPreReleaseNameToPaddedNumber(preReleaseName, zero_pad) {
  if(onlyNumbers(preReleaseName)) {
    return String(preReleaseName).padStart(zero_pad, '0');
  }

  let preReleaseNumber = 0;
  switch (preReleaseName) {
    case 'alpha':
      preReleaseNumber = 1;
      break;
    case 'beta':
      preReleaseNumber = 2;
      break;
    case 'rc':
      preReleaseNumber = 3;
      break;
    default:
      preReleaseNumber = 0;
      break;
  }

  return String(preReleaseNumber).padEnd(zero_pad, '0'); // '0001' instead of '1'
}

module.exports = converter;
