import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Skeleton } from "@heroui/react";

export default function PostSkeleton(props) {
	const { post } = props;

	// Format date if available
	const formatDate = (dateString) => {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	return (
		<Card className={`${props.className}`}>
			<CardHeader className="justify-between">
				<div className="flex gap-5">
					<div>
						<Skeleton className="flex rounded-full w-12 h-12" />
					</div>
					<div className="w-full flex flex-col gap-1 items-start justify-center">
						<Skeleton className="w-3/5 rounded-lg">
							<div className="h-3 w-full rounded-lg bg-secondary" />
						</Skeleton>
						<Skeleton className="w-2/5 rounded-lg">
							<div className="h-3 w-full rounded-lg bg-secondary-200" />
						</Skeleton>

					</div>
				</div>
				<div>

				</div>

				<Skeleton className="h-8 w-20 rounded-full" />
			</CardHeader>

			<CardBody className="w-[200] px-3 py-0 space-y-3 p-3">
				<div className="space-y-3">
					<Skeleton className="w-4/5 rounded-lg">
						<div className="h-3 w-full rounded-lg bg-secondary-300" />
					</Skeleton>
					<Skeleton className="w-2/5 rounded-lg">
						<div className="h-3 w-full rounded-lg bg-secondary-200" />
					</Skeleton>
				</div>
				<Skeleton className="rounded-lg">
					<div className="h-50 rounded-lg bg-secondary" />
				</Skeleton>
			</CardBody>

		</Card>
	);
}