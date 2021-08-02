/** Export Task to represent task object. */
export default class Task {
    constructor(title, description, createdDate, startDate, deadline, isActive, estimationTotal, estimationUsed, priority, category,status,completedDate) {
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.startDate = startDate;
        this.deadline = deadline;
        this.isActive = isActive;
        this.estimationTotal = estimationTotal;
        this.estimationUsed = estimationUsed;
        this.priority = priority;
        this.category = category;
        this.status = status;
        this.completedDate = completedDate;
    }
}