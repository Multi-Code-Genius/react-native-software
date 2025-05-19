import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {Platform, Alert, PermissionsAndroid} from 'react-native';
import {Buffer} from 'buffer';
import {api} from '../hooks/api';
import {useToast} from '../context/ToastContext';

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

export const downloadAndOpenPdf = async (
  gameId: string,
  showToast: Function,
) => {
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

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const fileName = `monthly_report_${gameId}_${Date.now()}.pdf`;
    const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    await RNFS.writeFile(
      filePath,
      Buffer.from(arrayBuffer).toString('base64'),
      'base64',
    );

    showToast({
      message: 'Report downloaded successfully!',
      type: 'success',
      showIcon: true,
    });
  } catch (error) {
    console.error('Download Error:', error);
    Alert.alert('Error', 'Failed to download or open the PDF.');
  }
};
