import GitColors from 'github-colors/lib/colors.json';
import {Colors} from '../consts/Colors';

type GitColorsType = {
  [language: string]: {
    type: string;
    color: string;
    extensions: string[];
    tm_scope: string;
    ace_mode: string;
    language_id: number;
  };
};

export const getLanguageColor = (language: string | undefined | null) => {
  if (language) {
    const languageColor = (GitColors as unknown as GitColorsType)[language]
      .color;
    return languageColor;
  } else return Colors.gitDefault;
};
