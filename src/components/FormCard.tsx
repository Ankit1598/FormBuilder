"use client";

import { DeleteFormById } from "@/actions/form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const FormCard = ({ form }: { form: Form }) => {
	const { refresh } = useRouter();

	const deleteForm = async () => {
		await DeleteFormById(Number(form.id));

		refresh();
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2 justify-between'>
					<span className='truncate font-bold'>{form.name}</span>
					<Badge variant={form.published ? "default" : "destructive"}>
						{form.published ? "Published" : "Draft"}
					</Badge>
				</CardTitle>
				<CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
					{formatDistance(form.createdAt, new Date(), {
						addSuffix: true
					})}
					{form.published && (
						<span className='flex items-center gap-2'>
							<LuView className='text-muted-foreground' />
							<span>{form.visits.toLocaleString()}</span>
							<FaWpforms className='text-muted-foreground' />
							<span>{form.submissions.toLocaleString()}</span>
						</span>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent className='h-5 truncate text-sm text-muted-foreground'>
				{form.description || "No description"}
			</CardContent>
			<CardFooter className='w-full grid grid-cols-2 gap-2'>
				{form.published ? (
					<Button asChild className='w-full mt-2 md:text-md gap-2'>
						<Link href={`/forms/${form.id}`}>
							View submissions{" "}
							<BiRightArrowAlt className='flex-shrink-0' />
						</Link>
					</Button>
				) : (
					<Button
						asChild
						variant={"secondary"}
						className='w-full mt-2 md:text-md gap-2'
					>
						<Link href={`/builder/${form.id}`}>
							Edit form <FaEdit />
						</Link>
					</Button>
				)}
				<Button
					variant={"destructive"}
					className='w-full mt-2 md:text-md gap-2'
					onClick={deleteForm}
				>
					Delete form <MdDelete />
				</Button>
			</CardFooter>
		</Card>
	);
};

export default FormCard;
