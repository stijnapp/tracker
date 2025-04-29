import { useState, useMemo, useRef } from 'react'
import Page from '../components/Page'
import { dateTimeToText } from '../helpers/dateTime'
import { db } from '../helpers/db'
import Collapse from '../components/Collapse'
import Checkbox from '../components/Form/Checkbox'
import Modal from '../components/modal/Modal'
import ModalHeader from '../components/modal/ModalHeader'
import ModalBody from '../components/modal/ModalBody'
import ModalFooter from '../components/modal/ModalFooter'
import useLocalStorage from '../hooks/useLocalStorage'

// Local storage key for saving export progress
const STORAGE_KEY = 'strongExportProgress';

export default function StrongExport() {
	const [dbData, setDbData] = useState(db.getAllData() || {})

	// State for modal
	const [isResetModalOpen, setIsResetModalOpen] = useState(false)

	// Use useLocalStorage hook directly for state management
	const [checkedState, setCheckedState] = useLocalStorage(STORAGE_KEY, {
		checkedExercises: [],
		checkedWorkouts: [],
		checkedWorkoutExercises: []
	})

	// Use a ref for the container of each workout instead of the Collapse component
	const workoutRefs = useRef({});

	// Handle checkbox changes for exercises
	const handleExerciseCheckboxChange = (exerciseId) => {
		setCheckedState(prev => {
			const newCheckedExercises = prev.checkedExercises.includes(exerciseId)
				? prev.checkedExercises.filter(id => id !== exerciseId)
				: [...prev.checkedExercises, exerciseId];

			return {
				...prev,
				checkedExercises: newCheckedExercises
			};
		});
	};

	// Handle checkbox changes for workouts
	const handleWorkoutCheckboxChange = (workoutId) => {
		setCheckedState(prev => {
			const newCheckedWorkouts = prev.checkedWorkouts.includes(workoutId)
				? prev.checkedWorkouts.filter(id => id !== workoutId)
				: [...prev.checkedWorkouts, workoutId];

			return {
				...prev,
				checkedWorkouts: newCheckedWorkouts
			};
		});
	};

	// Create a unique ID for each workout exercise combination
	const getWorkoutExerciseKey = (workoutId, workoutExerciseId) => {
		return `${workoutId}-${workoutExerciseId}`;
	};

	// Handle checkbox changes for workout exercises
	const handleWorkoutExerciseCheckboxChange = (workoutId, workoutExerciseId) => {
		const key = getWorkoutExerciseKey(workoutId, workoutExerciseId);
		setCheckedState(prev => {
			const newCheckedWorkoutExercises = prev.checkedWorkoutExercises.includes(key)
				? prev.checkedWorkoutExercises.filter(id => id !== key)
				: [...prev.checkedWorkoutExercises, key];

			return {
				...prev,
				checkedWorkoutExercises: newCheckedWorkoutExercises
			};
		});
	};

	// Scroll to a specific workout
	const scrollToWorkout = (workoutId) => {
		if (workoutRefs.current[workoutId]) {
			workoutRefs.current[workoutId].scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			});
		}
	};

	// Reset all progress
	const resetProgress = () => {
		setCheckedState({
			checkedExercises: [],
			checkedWorkouts: [],
			checkedWorkoutExercises: []
		});
		setIsResetModalOpen(false);
	};

	// Ensure properties exist with default empty arrays
	const exercises = dbData.exercises || [];
	const workouts = dbData.workouts || [];

	// Calculate the count of workouts with all exercises checked
	const fullyCheckedWorkoutsCount = useMemo(() => {
		return workouts.filter(workout => {
			// If a workout has no exercises, we can't consider it "fully checked"
			if (!workout.exercises || workout.exercises.length === 0) {
				// Only count it if the workout itself is checked
				return checkedState.checkedWorkouts.includes(workout.id);
			}

			// For workouts with exercises, check if all workout exercises are checked
			const allExercisesChecked = workout.exercises.every(exercise =>
				checkedState.checkedWorkoutExercises.includes(getWorkoutExerciseKey(workout.id, exercise.id))
			);

			return allExercisesChecked && checkedState.checkedWorkouts.includes(workout.id);
		}).length;
	}, [workouts, checkedState.checkedWorkouts, checkedState.checkedWorkoutExercises]);

	// Helper function to get workouts with partially checked exercises
	const partiallyCheckedWorkouts = useMemo(() => {
		return workouts.filter(workout => {
			// Skip if the workout has no exercises
			if (!workout.exercises || workout.exercises.length === 0) {
				return false;
			}

			// Count checked exercises for this workout
			const checkedCount = workout.exercises.filter(exercise =>
				checkedState.checkedWorkoutExercises.includes(getWorkoutExerciseKey(workout.id, exercise.id))
			).length;

			// Include if at least one but not all exercises are checked
			// Even if the workout checkbox is checked, we want to show it if not all workout exercises are checked
			return checkedCount > 0 && checkedCount < workout.exercises.length;
		});
	}, [workouts, checkedState.checkedWorkoutExercises]);

	// Helper function to create custom collapse title with checkbox
	const renderWorkoutTitle = (workout) => {
		// Count checked exercises in this workout
		const totalExercises = workout.exercises.length;
		const checkedCount = workout.exercises.filter(exercise =>
			checkedState.checkedWorkoutExercises.includes(getWorkoutExerciseKey(workout.id, exercise.id))
		).length;

		return (
			<div className="flex items-center">
				<Checkbox
					label=""
					checked={checkedState.checkedWorkouts.includes(workout.id)}
					onChange={(e) => {
						e.stopPropagation(); // Prevent collapse toggle when clicking checkbox
						handleWorkoutCheckboxChange(workout.id);
					}}
					className="mr-2"
				/>
				<span className="font-semibold">{dateTimeToText(workout.date, false, true)}</span>
				<span className="subtext ml-2">({checkedCount}/{workout.exercises.length} checked)</span>
			</div>
		);
	};

	return (
		<Page title="Export to Strong">
			<Collapse title="View available exercises" className="flex flex-col gap-2">
				<p>Count: {exercises.length}</p>
				{exercises.map((exercise) => (
					<div key={exercise.id} className="text-sm">
						<Checkbox
							label={<>ID {exercise.id}: <span className="font-semibold text-lg">{exercise.name}</span>{exercise.nickname && <span className="subtext"> ({exercise.nickname})</span>}</>}
							checked={checkedState.checkedExercises.includes(exercise.id)}
							onChange={() => handleExerciseCheckboxChange(exercise.id)}
						/>
					</div>
				))}
			</Collapse>

			<Collapse title={`Workouts with unchecked exercises (${partiallyCheckedWorkouts.length})`} className="flex flex-col gap-2 mt-4">
				{partiallyCheckedWorkouts.length === 0 ? (
					<p className="subtext">No partially checked workouts. You're all set!</p>
				) : (
					<ul className='flex flex-col gap-1'>
						{partiallyCheckedWorkouts.map(workout => {
							const totalExercises = workout.exercises.length;
							const checkedCount = workout.exercises.filter(exercise =>
								checkedState.checkedWorkoutExercises.includes(getWorkoutExerciseKey(workout.id, exercise.id))
							).length;

							return (
								<li key={workout.id} className="text-sm">
									<button
										onClick={() => scrollToWorkout(workout.id)}
										className="text-primary hover:underline focus:outline-none"
									>
										{dateTimeToText(workout.date, false, true)}
									</button> - <span className="font-medium">{checkedCount}/{totalExercises} checked</span>
								</li>
							);
						})}
					</ul>
				)}
			</Collapse>

			<div className="flex flex-col gap-4 mt-4">
				<h2 className="text-2xl font-bold">Workouts</h2>
				<p className='-mt-2'>Count: {fullyCheckedWorkoutsCount}/{workouts.length} checked</p>

				{workouts.map((workout) => (
					<div
						key={workout.id}
						ref={el => workoutRefs.current[workout.id] = el}
					>
						<Collapse
							title={renderWorkoutTitle(workout)}
						>
							{workout.exercises && workout.exercises.length > 0 ? (
								<div className="pl-2">
									{workout.exercises
										// Sort by exerciseId instead of order
										.sort((a, b) => a.exerciseId - b.exerciseId)
										.map((workoutExercise) => {
											const exercise = exercises.find(e => e.id === workoutExercise.exerciseId);
											if (!exercise) return null;

											return (
												<div key={workoutExercise.id} className="mb-4 border-b pb-2 last:border-b-0">
													<div className="flex items-center">
														<Checkbox
															label=""
															checked={checkedState.checkedWorkoutExercises.includes(getWorkoutExerciseKey(workout.id, workoutExercise.id))}
															onChange={() => handleWorkoutExerciseCheckboxChange(workout.id, workoutExercise.id)}
															className="mr-2"
														/>
														<div className="font-medium text-lg">
															{exercise.name}
															{exercise.nickname && <span className="subtext"> ({exercise.nickname})</span>}
														</div>
													</div>
													<div className="mt-1 pl-4">
														{workoutExercise.sets && workoutExercise.sets.map((set, index) => (
															<div key={set.id} className="flex space-x-4 mb-1">
																<span className="text-gray-500 w-14">Set {index + 1}:</span>
																<span className="w-20">{set.weight !== null ? `${set.weight}kg` : '-'}</span>
																<span>×</span>
																<span>{set.reps !== null ? `${set.reps} reps` : '-'}</span>
															</div>
														))}
													</div>
												</div>
											);
										})}
								</div>
							) : (
								<p className="subtext">No exercises in this workout</p>
							)}
						</Collapse>
					</div>
				))}
			</div>

			<div className="flex justify-center mt-8 mb-8">
				<button
					onClick={() => setIsResetModalOpen(true)}
					className="px-4 py-2 bg-danger text-white rounded-md hover:bg-red-700 transition-colors"
				>
					Reset All Progress
				</button>
			</div>

			{/* Reset confirmation modal */}
			<Modal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)}>
				<ModalHeader>Reset Export Progress</ModalHeader>
				<ModalBody>
					Are you sure you want to reset all export progress? This will uncheck all exercises and workouts and cannot be undone.
				</ModalBody>
				<ModalFooter>
					<button
						className="w-full justify-center rounded-md bg-danger px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:w-auto"
						onClick={resetProgress}
					>
						Reset Progress
					</button>
					<button
						className="w-full justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 sm:w-auto"
						onClick={() => setIsResetModalOpen(false)}
					>
						Cancel
					</button>
				</ModalFooter>
			</Modal>
		</Page>
	)
}