"use client";

import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null; // avoid rehydration errors

	return (
		<Tabs defaultValue={theme}>
			<TabsList className='border'>
				<TabsTrigger value='light' onClick={() => setTheme("light")}>
					<SunIcon className='h-5 w-5' />
				</TabsTrigger>
				<TabsTrigger value='dark' onClick={() => setTheme("dark")}>
					<MoonIcon className='h-5 w-5' />
				</TabsTrigger>
				<TabsTrigger value='system' onClick={() => setTheme("system")}>
					<DesktopIcon className='h-5 w-5' />
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}

export default ThemeSwitcher;
