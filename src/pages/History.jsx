import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Page from "../components/Page";
import { dateTimeToText } from "../helpers/dateTime";
import { db } from "../helpers/db";

export default function History() {
    const [workoutIds] = useState(db.getAllWorkoutIdsExcludingActive())
    console.log(db.getAllWorkoutIdsExcludingActive())

    // TODO: sort by date, amount of exercises, etc.
    return (
        <Page title="History">
            {workoutIds.length <= 0 ? (
                <Card title={<span className="block text-center">Welcome to the Workout Tracker!</span>}>
                    <p className="text-center">It looks like you haven&apos;t finished any workouts yet. Head over to the <Link to="/workout" className="font-medium underline text-primary">workout page</Link> to start your first workout.</p>
                </Card>
            ) : workoutIds.map((workoutId) => {
                const workout = db.getWorkoutById(workoutId)

                return (
                    <Card key={workoutId} title={dateTimeToText(workout.date)} className="flex flex-col gap-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{workout.exercises.length} exercises</p>
                    </Card>
                )
            })}
        </Page>
    )
}