import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description:Yup.string().required('description is required'),
    full_fillment_link: Yup.string().url('Enter a valid URL for Fullfillment Link').required('Fullfillment Link is required'),
    subcription_fee: Yup.number()
        .positive('Subcription fee must be a positive number')
        .min(0, 'Subcription fee must be greater than or equal to 0')
        .required('Subcription fee is required'),
    inclusive_GST: Yup.number().required('GST Percentage is required'),
    influencer_commission_percentage: Yup.number().required('Influencer Percentage is required'),
    organiser_commission_percentage: Yup.number().required('Organiser Percentage is required')
        .test('sum', 'Sum of percentages should not exceed 100', function (value) {
            const { inclusive_GST, influencer_commission_percentage } = this.parent;
            const sum = parseFloat(inclusive_GST) + parseFloat(influencer_commission_percentage) + parseFloat(value);
            return sum <= 100;
}),
})