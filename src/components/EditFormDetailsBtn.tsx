"use client";

import { UpdateFormDetailsById } from "@/actions/form";
import { formSchema, formSchemaType } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "./ui/dialog";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form as FormWrapper
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

function EditFormDetailsBtn({ form }: { form: Form }) {
	const router = useRouter();

	const editForm = useForm<formSchemaType>({
		resolver: zodResolver(formSchema),
		mode: "onSubmit",
		defaultValues: {
			name: form.name,
			description: form.description
		}
	});

	async function onSubmit(values: formSchemaType) {
		try {
			await UpdateFormDetailsById(form.id, values);
			toast({
				title: "Success",
				description: "Form Details updated successfully"
			});
			console.log("refresh");
			router.refresh();
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong, please try again later",
				variant: "destructive"
			});
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"outline"} className='gap-2'>
					<FaEdit className='h-4 w-4' />
					<span className='md:block hidden'>Edit Details</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update form details</DialogTitle>
					<DialogDescription>
						Refine and enhance your form details
					</DialogDescription>
				</DialogHeader>
				<FormWrapper {...editForm}>
					<form
						onSubmit={editForm.handleSubmit(onSubmit)}
						className='space-y-2'
					>
						<FormField
							control={editForm.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={editForm.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea rows={5} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</FormWrapper>
				<DialogFooter>
					<Button
						onClick={editForm.handleSubmit(onSubmit)}
						disabled={editForm.formState.isSubmitting}
						className='w-full mt-4'
					>
						{!editForm.formState.isSubmitting && <span>Save</span>}
						{editForm.formState.isSubmitting && (
							<ImSpinner2 className='animate-spin' />
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default EditFormDetailsBtn;
