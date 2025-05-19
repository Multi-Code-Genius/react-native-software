import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {Platform, Alert, PermissionsAndroid} from 'react-native';
import {Buffer} from 'buffer';
import {api} from '../hooks/api';

const requestStoragePermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save files.',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  return true;
};

export const downloadAndOpenPdf = async (gameId: string) => {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Cannot download file without permission.',
      );
      return;
    }

    const response = await api(`/api/dashboard/export-report/${gameId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
    });

    const arrayBuffer = await response.arrayBuffer();
    const fileName = `monthly_report_${gameId}.pdf`;
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    await RNFS.writeFile(
      filePath,
      Buffer.from(arrayBuffer).toString('base64'),
      'base64',
    );
    await FileViewer.open(filePath, {
      showOpenWithDialog: true,
      displayName: 'Monthly Report',
    });
  } catch (error) {
    console.error('Download Error:', error);
    Alert.alert('Error', 'Failed to download or open the PDF.');
  }
};
