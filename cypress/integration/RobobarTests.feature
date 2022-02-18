Feature: Robobar cart
  Scenario: user add one cola
    Given user opens robobar website
    When user adds a cola
    Then total should be €1.25

  Scenario Outline: user adds some cola
    Given user opens robobar website
    When user adds <n> cola
    Then total should be €<total>
    Examples:
      | n | total |
      | 3 | 3.75  |
      | 4 | 5.00  |

  Scenario Outline: user buy a several drinks
    Given user opens robobar website
    When user adds <cola> cola
    When user adds <beer> beer
    When user adds <wine> wine
    Then total should be €<total>
    Examples:
      | cola | beer | wine | total |
      | 1    | 0    | 0    | 1.25  |
      | 1    | 1    | 1    | 6.25  |


  Scenario: user adds one cola one beer one wine
    Given user opens robobar website
    When user adds a cola
    And user adds a beer
    And user adds a wine
    Then total should be €6.25

  Scenario Outline: user adds several drinks at once
    Given user opens robobar website
    When user adds <cola> cola <beer> beer <wine> wine
    Then total should be €<total>
    Examples:
      | cola | beer | wine | total |
      | 1    | 0    | 0    | 1.25  |
      | 0    | 1    | 0    | 2.00  |
      | 0    | 0    | 1    | 3.00  |
      | 1    | 1    | 1    | 6.25  |

  Scenario: underage user adds one beer 
    Given user opens robobar website
    When user adds a beer
    Then total should be €2.00
    When user checks out
    And user is 20 years old
    And user confirms the order
    Then alert is visible

  Scenario: overage user adds one beer
    Given user opens robobar website
    When user adds a beer
    Then total should be €2.00
    When user checks out
    And user is 20 years old
    And user confirms the order
    Then order is confirmed

  Scenario Outline: user adds several drinks at once with age confirmation
    Given user opens robobar website
    When user adds <cola> cola <beer> beer <wine> wine
    Then total should be €<total>
    When user checks out
    And user is <age> years old
    And user confirms the order
    But result is "<expected>"
    Examples:
      | cola | beer | wine | age | total | expected |
      | 1    | 0    | 0    | 10  | 1.25  | pass     |
      | 0    | 1    | 0    | 10  | 2.00  | fail     |
      | 0    | 0    | 1    | 21  | 3.00  | pass     |
      | 1    | 1    | 1    | 22  | 6.25  | pass     |