using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusementApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Slug = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    HeroUrl = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Rating = table.Column<double>(type: "float", nullable: false),
                    ReviewsCount = table.Column<int>(type: "int", nullable: false),
                    PriceFrom = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Languages = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    FreeCancellation = table.Column<bool>(type: "bit", nullable: false),
                    Chips = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Love = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionHtml = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Included = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Remember = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Meeting = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false),
                    CancelPolicy = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tours", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tours_Slug",
                table: "Tours",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tours");
        }
    }
}
