using AdminDashboard.Api.Models;

namespace AdminDashboard.Api.DTOs;

public record TaskDto(
    int Id,
    string Title,
    string? Notes,
    TaskPriority Priority,
    WorkItemStatus Status,
    DateTime CreatedAt,
    DateTime? DueDate,
    int ProjectId,
    string ProjectName,
    int? AssigneeId,
    string? AssigneeName
);

public record CreateTaskRequest(
    string Title,
    string? Notes,
    TaskPriority Priority,
    int ProjectId,
    int? AssigneeId,
    DateTime? DueDate
);

public record UpdateTaskRequest(
    string Title,
    string? Notes,
    TaskPriority Priority,
    WorkItemStatus Status,
    int? AssigneeId,
    DateTime? DueDate
);
