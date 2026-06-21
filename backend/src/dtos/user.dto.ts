export interface UserResponseDto {
    id: string;
    name: string;
    email: string;
    primaryMobile: string;
    secondaryMobile: string | null;
    aadhaar: string;
    pan: string;
    dateOfBirth: Date;
    placeOfBirth: string;
    currentAddress: string;
    permanentAddress: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export const toUserResponseDto = (user: any): UserResponseDto => ({
    id: user.id,
    name: user.name,
    email: user.email,
    primaryMobile: user.primaryMobile,
    secondaryMobile: user.secondaryMobile,
    aadhaar: user.aadhaar,
    pan: user.pan,
    dateOfBirth: user.dateOfBirth,
    placeOfBirth: user.placeOfBirth,
    currentAddress: user.currentAddress,
    permanentAddress: user.permanentAddress,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });