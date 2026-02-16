using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

[ApiController]
[Route("api/[controller]")] 
public class CustomerController : ControllerBase
{
    private readonly string _connectionString;
    public CustomerController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    [HttpGet]
public IActionResult GetCustomers()
{
    var customers = new List<object>();

    try 
    {
        using (SqlConnection conn = new SqlConnection(_connectionString))
        {
            conn.Open();
            var sql = "SELECT username FROM newTable"; 
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {

                        customers.Add(new
                        {
                            username = reader["username"].ToString()
                        });
                    }
                }
            }
        }
        return Ok(customers);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Database error: {ex.Message}");
    }
}
    }

