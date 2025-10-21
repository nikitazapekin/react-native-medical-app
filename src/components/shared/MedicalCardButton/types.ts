export interface MedicalCardButtonProps  {
  item:  {
id: number,
    text: string,
    screen:string,
  };
  onPress: () => void;
}
