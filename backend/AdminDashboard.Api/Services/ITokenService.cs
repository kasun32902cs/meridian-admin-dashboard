using AdminDashboard.Api.Models;

namespace AdminDashboard.Api.Services;

public interface ITokenService
{
    (string Token, DateTime ExpiresAt) GenerateToken(User user);
}
