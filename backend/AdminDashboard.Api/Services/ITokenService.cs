// backend/AdminDashboard.Api/Services/ITokenService.cs
using AdminDashboard.Api.Models;

namespace AdminDashboard.Api.Services;

public interface ITokenService
{
    string GenerateToken(User user);
}