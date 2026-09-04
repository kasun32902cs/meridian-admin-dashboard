namespace AdminDashboard.Api.Models;

public enum UserRole
{
    Admin,
    Manager,
    Member
}

public enum ProjectStatus
{
    Planned,
    Active,
    OnHold,
    Completed
}

public enum TaskPriority
{
    Low,
    Medium,
    High,
    Urgent
}

public enum WorkItemStatus
{
    Todo,
    InProgress,
    Blocked,
    Done
}
