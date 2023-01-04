import FormData from 'form-data';
interface PortfolioFormDataType {
  description: string;
  experience: string;
}
export const FormDataHooks = (data: PortfolioFormDataType, methods: any) => {
  const formData = new FormData();
  methods.getValues('images').forEach((e: File, i: number) => {
    formData.append('image', methods.watch('images')[i]);
  });
  formData.append('description', data.description);
  formData.append('experience', data.experience);
  return (
    formData
  );
};

