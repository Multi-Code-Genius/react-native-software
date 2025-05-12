import {BASE_URL} from '@env';

type GameFormData = {
  name: string;
  category: string;
  description: string;
  hourlyPrice: number;
  capacity: number;
  net: number;
  token: string;
  images: {
    uri: string;
    type: string;
    name: string;
  }[];
  location: {
    city: string;
    area: string;
    address: string;
  };
  gameInfo: {
    surface: string;
    indoor: boolean;
    outdoor: boolean;
    roof: boolean;
    equipmentProvided: boolean;
  };
};

export const createGame = async (data: GameFormData) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('category', data.category);
  formData.append('description', data.description);
  formData.append('hourlyPrice', data.hourlyPrice);
  formData.append('capacity', data.capacity);
  formData.append('net', data.net);

  formData.append('location[city]', data.location.city);
  formData.append('location[area]', data.location.area);
  formData.append('address', data.location.address);

  formData.append('gameInfo[surface]', data.gameInfo.surface);
  formData.append('gameInfo[indoor]', data.gameInfo.indoor.toString());
  formData.append(
    'gameInfo[equipment provided]',
    data.gameInfo.equipmentProvided.toString(),
  );

  data.images.forEach(image => {
    formData.append('game', {
      uri: image.uri,
      name: image.name,
      type: image.type,
    } as any);
  });

  const response = await fetch(`${BASE_URL}/api/game/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  return await response.json();
};
