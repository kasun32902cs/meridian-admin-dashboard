namespace AdminDashboard.Api.Models;

public class ProjectItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ProjectStatus Status { get; set; } = ProjectStatus.Planned;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DueDate { get; set; }

    public int OwnerId { get; set; }
    public User? Owner { get; set; }

    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}
