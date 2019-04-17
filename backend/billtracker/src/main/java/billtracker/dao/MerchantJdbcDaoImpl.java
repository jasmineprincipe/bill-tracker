package billtracker.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hsqldb.jdbc.JDBCDataSource;

import billtracker.domain.Merchant;

public class MerchantJdbcDaoImpl implements MerchantDao {

	private static MerchantJdbcDaoImpl INSTANCE;

	private JDBCDataSource dataSource;

	static public MerchantJdbcDaoImpl getInstance() {

		MerchantJdbcDaoImpl instance;
		if (INSTANCE != null) {
			instance = INSTANCE;
		} else {
			instance = new MerchantJdbcDaoImpl();
			INSTANCE = instance;
		}

		return instance;
	}

	private MerchantJdbcDaoImpl() {
		init();
	}

	private void init() {
		dataSource = new JDBCDataSource();
		dataSource.setDatabase("jdbc:hsqldb:mem:MERCHANT");
		dataSource.setUser("username");
		dataSource.setPassword("password");

		createMerchantTable();
		insertInitMerchants();

	}

	private void createMerchantTable() {
		String createSql = "CREATE TABLE MERCHANTS " + "(id INTEGER IDENTITY PRIMARY KEY, " + " merchant_name VARCHAR(255) UNIQUE, "
				+ " merchant_description VARCHAR(255))";

		try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement()) {

			stmt.executeUpdate(createSql);

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	private void insertInitMerchants() {

		add(new Merchant("Meralco","Electricty"));
		add(new Merchant("Globe Telecom","Cellular Phones"));
		add(new Merchant("Cignal","Cable TV"));
		add(new Merchant("PLDT","Internet"));
		add(new Merchant("Maynilad","Water"));
	}

	@Override
	public List<Merchant> findAll() {

		return findByName(null);
	}

	@Override
	public Merchant find(Long id) {

		Merchant merchant = null;

		if (id != null) {
			String sql = "SELECT id, merchant_name, merchant_description FROM MERCHANTS where id = ?";
			try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

				ps.setInt(1, id.intValue());
				ResultSet results = ps.executeQuery();

				if (results.next()) {
					merchant = new Merchant(Long.valueOf(results.getInt("id")), results.getString("merchant_name"),
							results.getString("merchant_description"));
				}

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		return merchant;
	}

	@Override
	public List<Merchant> findByName(String merchantName) {
		List<Merchant> merchants = new ArrayList<>();

		String sql = "SELECT id, merchant_name, merchant_description FROM MERCHANTS WHERE merchant_name LIKE ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setString(1, createSearchValue(merchantName));
			
			ResultSet results = ps.executeQuery();
			
			while (results.next()) {
				Merchant merchant = new Merchant(Long.valueOf(results.getInt("id")), results.getString("merchant_name"),
						results.getString("merchant_description"));
				merchants.add(merchant);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return merchants;
	}

	private String createSearchValue(String string) {
		
		String value;
		
		if (StringUtils.isBlank(string)) {
			value = "%";
		} else {
			value = string;
		}
		
		return value;
	}
	
	@Override
	public void add(Merchant merchant) {
		
		String insertSql = "INSERT INTO MERCHANTS (merchant_name, merchant_description) VALUES (?, ?)";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(insertSql)) {

			ps.setString(1, merchant.getMerchantName());
			ps.setString(2, merchant.getMerchantDescription());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void update(Merchant merchant) {
		String updateSql = "UPDATE MERCHANTS SET merchant_name = ?, merchant_description = ? WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setString(1, merchant.getMerchantName());
			ps.setString(2, merchant.getMerchantDescription());
			ps.setLong(3, merchant.getId());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void delete(Long id) {
		String updateSql = "DELETE FROM MERCHANTS WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setLong(1, id);
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

}
