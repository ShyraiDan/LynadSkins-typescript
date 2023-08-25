import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AddPostPage } from '../pages/AddPostPage'
import { FullPost } from '../pages/FullPost'
import { ChangePage } from '../pages/ChangePage'
import { Layout } from '../pages/Layout'
import { MainPage } from '../pages/MainPage'
import { Nopage } from '../pages/Nopage'
import { PrimePage } from '../pages/PrimePage'
import { BlogPage } from '../pages/BlogPage/BlogPage'
import { MarketPage } from '../pages/MarketPage'
import { ProfilePage } from '../pages/ProfilePage'
export const MainLayout: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path='prime' element={<PrimePage />} />
					<Route path='*' element={<Nopage />} />
					<Route path='blog' element={<BlogPage />} />
					<Route path='market' element={<MarketPage />} />
					<Route path='profile' element={<ProfilePage />} />
					<Route path='trade' element={<ChangePage />} />
					<Route path='blog/:id' element={<FullPost />} />
					<Route path='blog/:id/edit' element={<AddPostPage />} />
					<Route path='/add-post' element={<AddPostPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
