import { body, check } from 'express-validator';

export const validationCreateOffer = [
  body('title').isString().isLength({ min: 16, max: 60 }).trim(),
  body('carLiters').isNumeric().optional({ checkFalsy: true }).isLength({ max: 4 }).trim(),
  body('carBrand').isLength({ min: 2, max: 30 }).trim(),
  check('carModel').isLength({ max: 40 }).isString().trim(),
  body('carForces').isNumeric().optional({ checkFalsy: true }).isLength({ max: 4 }).trim(),
  body('carYear').isNumeric().optional({ checkFalsy: true }).isLength({ max: 4 }).trim(),
  body('description').isString().isLength({ min: 80, max: 9000 }).trim(),
  body('carType').isString().isLength({ min: 1, max: 50 }).trim(),
  body('carTransmission').isString().isLength({ min: 1, max: 50 }).trim(),
  body('carGas').isString().isLength({ min: 1, max: 50 }).trim(),
  body('carDrive').isString().isLength({ min: 1, max: 50 }).trim(),
  body('budget').isNumeric().isLength({ min: 3, max: 20 }).trim(),
  body('budgetService').isNumeric().isLength({ min: 3, max: 20 }).trim(),
  check('currency').isString().isLength({ min: 1, max: 1 }).trim().matches(/^[$€₴]$/g),
  body('phoneNumber').isString().isLength({min: 10, max: 25}).trim().matches(/^[/+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/),
  body('city').isString().isLength({max: 40}).trim().matches(/[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/g)
];

export const validationSignUp = [
  body('email').isEmail(),
  body('userName').isLength({min: 2, max:20}).isString().matches(/[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/g),
  body('password').isLength({min: 3, max: 32}).isString(),
  body('role').isLength({min: 2, max: 15}).isString(),
]

export const validationLogin = [
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}).isString()
]

export const validationUserSettings = [
  body('userName').isLength({min: 2, max: 20}).isString().matches(/[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/g),
  body('userLastName').isLength({min: 2, max: 20}).isString().matches(/[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/g),
  body('email').isEmail(),
  body('city').isString().isLength({max: 40}).trim().matches(/[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/g),
  body('phoneNumber').isString().isLength({min: 10, max: 25}).trim().matches(/^[/+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/),
]

export const pickerChangePortfolioValidate = [
  body('description').isLength({min: 80, max: 9000}).isString(),
  body('experience').isLength({min: 3, max: 40}).isString()
]