import { FC } from 'react'
import { MainPageTop } from './components/MainPageTop'
import { Advantage } from './components/Advantage'
import { AdvantagesSlider } from './components/AdvantagesSlider'
import { PopularItems } from './components/PopularItems'
export const MainPage: FC = () => {
	return (
		<>
			<MainPageTop />
			<Advantage />
			<AdvantagesSlider />
			<PopularItems />
		</>
	)
}
