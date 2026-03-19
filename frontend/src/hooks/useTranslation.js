import useStore from '../store/useStore'
import { translations } from '../lib/translations'

export const useTranslation = () => {
  const language = useStore(state => state.language)
  return translations[language]
}
