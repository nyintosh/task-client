export default interface ITask {
	completed: boolean;
	id?: number;
	title: string;
	description: string;
	name: string;
	pickup_location: string;
	dropoff_location: string;
	notes: string;
	date: string;
}
