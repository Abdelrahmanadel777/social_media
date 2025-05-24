import Joi from "joi";

export const addReportValidation = Joi.object({
    report: Joi.string().valid('none', 'span', 'abusive', 'stalker').required(),
    user: Joi.string().hex().length(24),
    post: Joi.string().hex().length(24).required()
})
export const removeReportValidation = Joi.object({

    id: Joi.string().hex().length(24).required()
})