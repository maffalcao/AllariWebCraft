using Bogus;

namespace AllariWebCraft.Service;

public class Service : IService
{
    public List<string> GetItems()
    {
        var randomNumber = new Random();
        return GenerateRandomCityNames(randomNumber.Next(1, 20));
    }

    private List<string> GenerateRandomCityNames(int size)
    {
        var faker = new Faker();
        var cityNames = new List<string>();

        for (int i = 0; i < size; i++)
        {
            string cityName = faker.Address.City();
            cityNames.Add(cityName);
        }

        return cityNames;
    }
}
