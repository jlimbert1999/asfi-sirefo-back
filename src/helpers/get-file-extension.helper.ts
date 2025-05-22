import { fromBuffer } from 'file-type';

export interface FileTypeInfo {
  ext: string;
  mime: string;
}

export const getFileType = async (buffer: Buffer): Promise<FileTypeInfo | null> => {
  if (!buffer || buffer.length === 0) return null;
  try {
    const result = await fromBuffer(buffer);
    return result
      ? {
          ext: result.ext,
          mime: result.mime,
        }
      : null;
  } catch (err) {
    return null;
  }
};
