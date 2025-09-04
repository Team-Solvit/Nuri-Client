export const decodeJWT = (token: string) => {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error('JWT 디코드 실패:', error);
    return null;
  }
};