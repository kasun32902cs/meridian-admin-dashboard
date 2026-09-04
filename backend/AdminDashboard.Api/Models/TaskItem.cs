namespace AdminDashboard.Api.Models;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public WorkItemStatus Status { get; set; } = WorkItemStatus.Todo;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DueDate { get; set; }

    public int ProjectId { get; set; }
    public ProjectItem? Project { get; set; }

    public int? AssigneeId { get; set; }
    public User? Assignee { get; set; }
}
