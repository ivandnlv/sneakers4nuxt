import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['app/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue', 'src/**/*.vue']
}
