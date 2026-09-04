using AdminDashboard.Api.Models;

namespace AdminDashboard.Api.DTOs;

public record ProjectDto(
    int Id,
    string Name,
    string Description,
    ProjectStatus Status,
    DateTime CreatedAt,
    DateTime? DueDate,
    int OwnerId,
    string OwnerName,
    int TaskCount
);

public record CreateProjectRequest(
    string Name,
    string Description,
    int OwnerId,
    DateTime? DueDate
);

public record UpdateProjectRequest(
    string Name,
    string Description,
    ProjectStatus Status,
    DateTime? DueDate
);
