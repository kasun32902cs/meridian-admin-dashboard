namespace AdminDashboard.Api.DTOs;

public record DashboardSummaryDto(
    int TotalUsers,
    int ActiveUsers,
    int TotalProjects,
    int ActiveProjects,
    int TotalTasks,
    int TasksDone,
    int TasksOverdue,
    List<TaskStatusBreakdown> TaskStatusBreakdown,
    List<RecentTaskDto> RecentTasks
);

public record TaskStatusBreakdown(string Status, int Count);

public record RecentTaskDto(int Id, string Title, string ProjectName, string Status, DateTime CreatedAt);
