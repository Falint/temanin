/**
 * Mock PIK-R partner data for development.
 * These are NOT real organizations — they are demo placeholders.
 *
 * @typedef {Object} PikrPartner
 * @property {string} id
 * @property {string} name
 * @property {string} city
 * @property {string} district - Must match a region id from regions.js
 * @property {boolean} isAvailable
 * @property {boolean} chatEnabled
 * @property {boolean} telegramEnabled
 * @property {string} [telegramUrl]
 * @property {boolean} offlineCounselingEnabled
 * @property {string} [description]
 */

/** @type {PikrPartner[]} */
export const pikrPartners = [
  {
    id: 'pikr-demo-a',
    name: 'PIK-R Demo A',
    city: 'Depok',
    district: 'beji',
    isAvailable: true,
    chatEnabled: true,
    telegramEnabled: true,
    telegramUrl: '',
    offlineCounselingEnabled: true,
    description: 'Pusat konseling sebaya untuk remaja wilayah Beji dan sekitarnya.',
  },
  {
    id: 'pikr-demo-b',
    name: 'PIK-R Demo B',
    city: 'Depok',
    district: 'cimanggis',
    isAvailable: true,
    chatEnabled: true,
    telegramEnabled: false,
    telegramUrl: '',
    offlineCounselingEnabled: true,
    description: 'Layanan pendampingan remaja di kawasan Cimanggis.',
  },
  {
    id: 'pikr-demo-c',
    name: 'PIK-R Demo C',
    city: 'Depok',
    district: 'sukmajaya',
    isAvailable: false,
    chatEnabled: false,
    telegramEnabled: true,
    telegramUrl: '',
    offlineCounselingEnabled: false,
    description: 'Konseling sebaya untuk remaja Sukmajaya. Sedang tidak aktif.',
  },
  {
    id: 'pikr-demo-d',
    name: 'PIK-R Demo D',
    city: 'Depok',
    district: 'pancoran-mas',
    isAvailable: true,
    chatEnabled: true,
    telegramEnabled: true,
    telegramUrl: '',
    offlineCounselingEnabled: false,
    description: 'Wadah curhat dan sharing untuk remaja Pancoran Mas.',
  },
  {
    id: 'pikr-demo-e',
    name: 'PIK-R Demo E',
    city: 'Depok',
    district: 'sawangan',
    isAvailable: true,
    chatEnabled: false,
    telegramEnabled: true,
    telegramUrl: '',
    offlineCounselingEnabled: true,
    description: 'Pusat informasi dan konseling remaja Sawangan.',
  },
  {
    id: 'pikr-demo-f',
    name: 'PIK-R Demo F',
    city: 'Depok',
    district: 'cinere',
    isAvailable: true,
    chatEnabled: true,
    telegramEnabled: false,
    telegramUrl: '',
    offlineCounselingEnabled: true,
    description: 'Layanan konseling dan edukasi remaja Cinere.',
  },
  {
    id: 'pikr-demo-g',
    name: 'PIK-R Demo G',
    city: 'Depok',
    district: 'tapos',
    isAvailable: false,
    chatEnabled: true,
    telegramEnabled: true,
    telegramUrl: '',
    offlineCounselingEnabled: false,
    description: 'Komunitas konseling sebaya Tapos. Sedang dalam pembaruan.',
  },
  {
    id: 'pikr-demo-h',
    name: 'PIK-R Demo H',
    city: 'Depok',
    district: 'beji',
    isAvailable: true,
    chatEnabled: true,
    telegramEnabled: true,
    telegramUrl: '',
    offlineCounselingEnabled: true,
    description: 'Unit PIK-R kedua di wilayah Beji untuk menjangkau lebih banyak remaja.',
  },
];

/**
 * Get PIK-R partners filtered by district.
 * @param {string} districtId
 * @returns {PikrPartner[]}
 */
export function getPikrByDistrict(districtId) {
  if (!districtId) return pikrPartners;
  return pikrPartners.filter((p) => p.district === districtId);
}

/**
 * Get a single PIK-R partner by ID.
 * @param {string} id
 * @returns {PikrPartner|undefined}
 */
export function getPikrById(id) {
  return pikrPartners.find((p) => p.id === id);
}
