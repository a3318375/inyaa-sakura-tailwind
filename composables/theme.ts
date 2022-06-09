export function useTheme() {
  const theme = useState('theme', () => false)

  function updateThemeShow() {
    theme.value = true
  }
  function updateThemeHide() {
    theme.value = false
  }

  return {
    theme,
    updateThemeShow,
    updateThemeHide,
  }
}
