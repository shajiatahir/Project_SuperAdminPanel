const Joi = require('joi');

const validateAdminCreation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().email(),
    });

    return schema.validate(data);
};

const validateDateRange = (data) => {
    const schema = Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().min(Joi.ref('startDate')).required()
    });

    return schema.validate(data);
};

const validatePromotion = (data) => {
    const schema = Joi.object({
        code: Joi.string().required().min(3).max(20),
        description: Joi.string().required(),
        discountType: Joi.string().valid('percentage', 'fixed').required(),
        discountValue: Joi.number().required().positive(),
        validFrom: Joi.date().required(),
        validUntil: Joi.date().greater(Joi.ref('validFrom')).required(),
        maxUses: Joi.number().integer().min(1).allow(null)
    });

    return schema.validate(data);
};

module.exports = {
    validateAdminCreation,
    validateDateRange,
    validatePromotion
}; 