export interface MedicalCardButtonProps  {
  item:  {
id: number,
    text: string,
    screen:string,

  };
  id: string
  onPress: () => void;
}
